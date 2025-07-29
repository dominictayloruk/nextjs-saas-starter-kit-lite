import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { PageBody } from '@kit/ui/page';

export const generateMetadata = async () => {
  return {
    title: 'Settings',
  };
};

function PersonalAccountSettingsPage() {
  return (
    <PageBody>
      <div className={'flex w-full flex-1 flex-col lg:max-w-2xl'}>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Settings page is under construction.</p>
          </CardContent>
        </Card>
      </div>
    </PageBody>
  );
}

export default PersonalAccountSettingsPage;
