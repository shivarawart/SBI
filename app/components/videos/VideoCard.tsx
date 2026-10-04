type Video = {
  id: string;
  video_url: string;
  description: string;

  thumbnail_url?: string | null;

  original_name?: string | null;
  mime_type?: string | null;
  file_size?: number | null;

  created_at: string;

  owner_name: string;
  owner_email: string;
};

function formatFileSize(bytes?: number | null) {
  if (!bytes) return "";

  const mb = bytes / (1024 * 1024);

  if (mb < 1) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${mb.toFixed(1)} MB`;
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-video overflow-hidden bg-black">
        <video
          controls
          preload="metadata"
          poster={video.thumbnail_url || undefined}
          className="h-full w-full object-cover"
        >
          <source src={video.video_url} type={video.mime_type || undefined} />
          Your browser does not support video playback.
        </video>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">{video.owner_name}</p>

            <p className="mt-1 text-xs text-white/35">{video.owner_email}</p>
          </div>

          {video.file_size && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/40">
              {formatFileSize(video.file_size)}
            </span>
          )}
        </div>

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-white/60">
          {video.description}
        </p>

        <div className="mt-5 border-t border-white/10 pt-4 text-xs text-white/30">
          {new Date(video.created_at).toLocaleDateString()}
        </div>
      </div>
    </article>
  );
}
