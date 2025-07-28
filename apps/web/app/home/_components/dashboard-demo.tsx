'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

export function DashboardDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your dashboard is ready!</p>
        </CardContent>
      </Card>
    </div>
  );
}
