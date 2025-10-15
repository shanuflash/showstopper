function PageContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-360 px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default PageContainer;
