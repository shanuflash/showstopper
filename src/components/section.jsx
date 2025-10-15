import PageContainer from "./page-container";

function Section({ title, action, children, className = "" }) {
  return (
    <section className={`mt-10 md:mt-14 ${className}`}>
      <PageContainer>
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-fg">
            {title}
          </h2>
          {action}
        </div>
        {children}
      </PageContainer>
    </section>
  );
}

export default Section;
