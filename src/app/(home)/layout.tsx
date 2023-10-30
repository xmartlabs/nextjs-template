import { BaseLayout } from '@/common/base-layout/base-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BaseLayout withNavbar withFooter>{children}</BaseLayout>
}
