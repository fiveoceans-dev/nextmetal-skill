# Dataset Description

This document captures the current data export that the app produces and a proposed standardized layout modeled after the shard/chunk structure below. The proposal keeps the same spirit as the provided example but generalizes it to multimodal inputs (screen, webcam, audio, keyboard, mouse, gamepad, etc.) and keeps mouse movement fidelity for future cursor tracing.

## Current export (as of `src/pages/Dashboard.tsx`)
- Export trigger: stopping a recording in the dashboard.
- Output bundle: a ZIP named `NextMetalStorage/<session_id>.zip` containing:
  - `<session_id>.webm` — combined screen (and optional webcam) video with system audio when enabled.
  - `<session_id>_input.json` — raw input stream captured during the session.
  - `<session_id>_metadata.json` — session + environment metadata.
- Input event shape (array in `<session_id>_input.json`):
  ```json
  {
    "sessionId": "<session_id>",
    "startTime": 1711111111111,
    "duration": 12345,
    "inputEvents": [
      {
        "timestamp": 1711111111222,
        "type": "keyboard",      // or "mouse"
        "event": "keydown",      // keydown|keyup|mousemove|mousedown|mouseup
        "data": {
          "key": "A",
          "code": "KeyA",
          "ctrlKey": false,
          "altKey": false,
          "shiftKey": false,
          "x": 640,              // mouse events only
          "y": 360,
          "screenX": 1280,       // mousemove only
          "screenY": 720,
          "button": 0            // mousedown/up only
        }
      }
    ]
  }
  ```
- Metadata shape (stored in `<session_id>_metadata.json`):
  ```json
  {
    "session": {
      "id": "<session_id>",
      "startTime": "2024-03-01T12:00:00.000Z",
      "endTime": "2024-03-01T12:05:00.000Z",
      "duration": 300000,
      "totalInputEvents": 123
    },
    "recording": {
      "videoFormat": "WebM (VP9)",
      "videoCodec": "VP9",
      "audioEnabled": true,
      "audioSource": "system",
      "webcamEnabled": true,
      "screenRecordingEnabled": true,
      "inputTrackingEnabled": true
    },
    "system": {
      "userAgent": "<ua>",
      "platform": "<platform>",
      "language": "<lang>",
      "timestamp": "<iso8601>"
    },
    "ai": {
      "trainingReady": true,
      "dataTypes": ["video", "audio", "webcam", "keyboard", "mouse"],
      "synchronizationMethod": "timestamp-based",
      "frameRate": 30,
      "dataFormat": "WebM + JSON"
    }
  }
  ```
- Gaps vs. target: no chunking/sharding, no Parquet, no explicit cursor traces or frame-to-event alignment, and no modality-specific bounding boxes.

## Proposed standardized layout (sharded, chunked)
Directory/layout (20s chunks, shard folders for scale):
```
dataset_root/
├── actions
│   ├── SHARD_0000/
│   │   ├── <video_id>/
│   │   │   ├── <video_id>_chunk_0000/
│   │   │   │   ├── actions_raw.parquet
│   │   │   │   ├── actions_processed.parquet   # optional, cleaned/remapped
│   │   │   │   └── metadata.json
│   │   │   ├── <video_id>_chunk_0001/
│   │   │   │   ├── actions_raw.parquet
│   │   │   │   ├── actions_processed.parquet
│   │   │   │   └── metadata.json
│   │   │   └── ...
│   └── SHARD_0001/
│       └── ...
├── video/
│   ├── SHARD_0000/
│   │   ├── <video_id>/
│   │   │   ├── <video_id>_chunk_0000.mp4       # or .webm
│   │   │   ├── <video_id>_chunk_0001.mp4
│   │   │   └── ...
│   └── SHARD_0001/
│       └── ...
└── audio/                                     # optional separate audio per chunk
    ├── SHARD_0000/
    │   ├── <video_id>/
    │   │   ├── <video_id>_chunk_0000.wav
    │   │   └── ...
    └── ...
```

### Chunk metadata (`metadata.json`)
```json
{
  "uuid": "<video_id>_chunk_<chunk_number>_actions",
  "chunk_id": "<chunk_number>",
  "chunk_size": 600,                  // frames in this chunk
  "original_video": {
    "resolution": [1080, 1920],
    "video_id": "<video_id>",
    "source": "screen+mic+webcam",
    "url": "s3://bucket/path/<video_id>.mp4",
    "start_time": 120.0,              // seconds in original stream
    "end_time": 140.0,
    "duration": 20.0,
    "start_frame": 3600,
    "end_frame": 4200,
    "fps": 30
  },
  "modality_config": {
    "screen": {"enabled": true},
    "webcam": {"enabled": false},
    "audio": {"enabled": true, "channels": 2, "sample_rate": 48000},
    "keyboard": {"enabled": true},
    "mouse": {"enabled": true, "coordinate_space": "screen"},
    "gamepad": {"enabled": false}
  },
  "bbox_controller_overlay": [0, 0, 0, 0],      // optional masking areas
  "bbox_game_area": { "xtl": 0.0, "ytl": 0.0, "xbr": 1.0, "ybr": 1.0 },
  "bbox_others": [],
  "sync": {
    "timebase": "ms",
    "video_offset_ms": 0,             // drift correction if any
    "audio_offset_ms": 0
  }
}
```

### `actions_raw.parquet` schema (per frame or per event)
- `timestamp_ms` (int64): wall-clock aligned to video chunk start.
- `frame_idx` (int64, optional): frame index in chunk.
- `source` (string): `keyboard` | `mouse` | `gamepad` | `touch`.
- `event_type` (string): `keydown` | `keyup` | `mousemove` | `mousedown` | `mouseup` | `wheel` | `button` | `stick`.
- `state` (string/nullable): `pressed` | `released` | `held` (for buttons).
- `key` / `code` (string, nullable): keyboard fields.
- `mouse_x`, `mouse_y` (float): absolute pixels.
- `mouse_x_norm`, `mouse_y_norm` (float): normalized [0,1] relative to resolution for cursor tracing.
- `mouse_wheel` (float, nullable): scroll delta.
- `mouse_button` (int, nullable): 0/1/2.
- `gamepad_button_*` (bool, optional): for controller mappings when present.
- `stick_left_x`, `stick_left_y`, `stick_right_x`, `stick_right_y` (float, [-1,1], optional).
- `meta`: struct/json for extra per-event data (e.g., modifiers, window focus).

### `actions_processed.parquet`
- Same columns as raw but with:
  - Debounced/deduped events.
  - Normalized coordinate system and deadzone handling.
  - Optional remapping to a canonical controller/keyboard layout.
  - Quality flags: `is_valid` (bool), `confidence` (float), `notes` (string).

### Notes for implementation
- Chunk length: 20s to mirror the example; align `actions_*` rows by `timestamp_ms` to video frames using `fps`.
- Mouse/cursor tracing: store both pixel and normalized coordinates; keep frame index for precise overlay.
- Storage targets: Parquet for columnar efficiency; MP4/WebM for video; optional separate WAV per chunk for clean audio.
- Sharding: zero-padded `SHARD_xxxx` to enable simple scaling across buckets or object storage.
