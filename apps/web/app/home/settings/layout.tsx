import { AppBreadcrumbs } from '@kit/ui/app-breadcrumbs';
import { PageHeader } from '@kit/ui/page';

function UserSettingsLayout(props: React.PropsWithChildren) {
  return (
    <>
      <PageHeader title="Settings" description={<AppBreadcrumbs />} />

      {props.children}
    </>
  );
}

export default UserSettingsLayout;
