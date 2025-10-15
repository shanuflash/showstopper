import PageContainer from "../../components/page-container";

function TrailerReveal({ video, revealed }) {
  return (
    <PageContainer
      className={`overflow-hidden transition-all duration-500 ease-out ${
        revealed ? "max-h-160 opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
      }`}
    >
      <div className="aspect-video w-full rounded-2xl overflow-hidden ring-1 ring-white/10">
        {video?.key && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </PageContainer>
  );
}

export default TrailerReveal;
