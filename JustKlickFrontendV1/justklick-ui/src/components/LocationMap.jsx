import { MapPin, ExternalLink } from "lucide-react";

export default function LocationMap({ details }) {
  const mapQuery = encodeURIComponent(
    details?.contact?.address ||
      `${details?.location || ""}, ${details?.city || ""}, ${
        details?.state || ""
      }` ||
      details?.name ||
      ""
  );

  const displayAddress =
    details?.contact?.address ||
    `${details?.location || ""}, ${details?.city || ""}, ${
      details?.state || ""
    }` ||
    "Location not available";

  return (
    <section className="mt-6 w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#ef233c]" />
            <h2 className="text-lg font-bold text-gray-900">Location</h2>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {displayAddress}
          </p>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b2a5b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#071f45]"
        >
          Open in Google Maps
          <ExternalLink size={15} />
        </a>
      </div>

      <div className="mt-4 w-full overflow-hidden rounded-xl border border-gray-200">
        <iframe
          title={`${details?.name || "Location"} Map`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[320px] w-full md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}