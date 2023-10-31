import { ErrorComponent } from "../components/ErrorComponent";
import { Layout } from "../components/Layout";

export function NotFoundPage(): JSX.Element {
  return (
    <Layout>
      <div className="layout-content-inner">
        <div className="flex card flex-col items-center gap-5 sm:p-8">
          <ErrorComponent />
          <div className="font-semibold text-900 text-center text-4xl border-t-2 surface-border pt-5">
            Page Not Found
          </div>
        </div>
      </div>
    </Layout>
  );
}
