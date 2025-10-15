import PageContainer from "./page-container";

function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <PageContainer className="pt-32 pb-10">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.25em] text-fg-subtle">
              {eyebrow}
            </div>
          )}
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-fg">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-fg-muted max-w-xl text-base">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-8 h-px w-full bg-white/5" />
    </PageContainer>
  );
}

export default PageHeader;
