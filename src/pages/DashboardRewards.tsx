import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Coins, Star, Gamepad2 } from "lucide-react";
import { Step1LinkAccount } from "@/components/Step1LinkAccount";
import { useAccount } from 'wagmi';

export default function DashboardRewards() {
  const [user, setUser] = useState<any>(null);
  const { isConnected } = useAccount();

  // Mock user data - in real app this would come from auth context
  useEffect(() => {
    // Simulate getting user data
    setUser({ id: "user123", email: "user@example.com" });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Rewards
        </h1>
        <p className="text-muted-foreground">Earn rewards by playing games and training AI</p>
      </div>

      <Tabs defaultValue="league" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="league" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            League of Legends
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="league" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                League of Legends Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Link your League of Legends account to start earning rewards for gameplay data that trains AI.
              </p>

              {user && (
                <Step1LinkAccount
                  userId={user.id}
                  onComplete={() => {
                    // Handle completion
                    console.log("League account linked successfully");
                  }}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Rewards Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Link Your Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect your League of Legends account to verify ownership
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Play & Record</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our recording studio to capture your gameplay sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Earn $METAL</h4>
                    <p className="text-sm text-muted-foreground">
                      Get rewarded for high-quality training data that helps build AGI
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 $METAL</div>
                <p className="text-xs text-muted-foreground">
                  Start recording to earn rewards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 $METAL</div>
                <p className="text-xs text-muted-foreground">
                  Monthly earnings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                <Gamepad2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Recorded sessions
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No earnings yet</p>
                <p className="text-sm">Start recording games to earn $METAL tokens</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earning Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Per minute of gameplay</span>
                  <Badge variant="secondary">0.5 $METAL</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quality bonus</span>
                  <Badge variant="secondary">Up to +50%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">First-time bonus</span>
                  <Badge variant="secondary">2x rate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Gamepad2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">First Recording</h4>
                    <p className="text-sm text-muted-foreground">Record your first game session</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Champion</h4>
                    <p className="text-sm text-muted-foreground">Earn 100 $METAL</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pro Gamer</h4>
                    <p className="text-sm text-muted-foreground">Record 10 sessions</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Coins className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">Wealthy</h4>
                    <p className="text-sm text-muted-foreground">Earn 1000 $METAL</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
