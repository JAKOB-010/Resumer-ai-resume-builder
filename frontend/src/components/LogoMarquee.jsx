import amazonLogo from '../../assets/logos/amazon-ar21.svg';
import googleLogo from '../../assets/logos/google-wordmark.svg';
import metaLogo from '../../assets/logos/Meta_Platforms_Inc._logo.svg';
import netflixLogo from '../../assets/logos/Netflix_2015_logo.svg';
import paytmLogo from '../../assets/logos/Paytm_Logo_(standalone).svg';
import spotifyLogo from '../../assets/logos/spotify_wordmark.svg';
import stripeLogo from '../../assets/logos/stripe_wordmark.svg';
import uberLogo from '../../assets/logos/Uber_dark.svg';

const logos = [
  { id: 1, src: amazonLogo, alt: 'Amazon' },
  { id: 2, src: googleLogo, alt: 'Google' },
  { id: 3, src: metaLogo, alt: 'Meta' },
  { id: 4, src: netflixLogo, alt: 'Netflix' },
  { id: 5, src: paytmLogo, alt: 'Paytm' },
  { id: 6, src: spotifyLogo, alt: 'Spotify' },
  { id: 7, src: stripeLogo, alt: 'Stripe' },
  { id: 8, src: uberLogo, alt: 'Uber' },
];

/** Equal-width columns + min-w-0 so wide SVGs scale inside the cell instead of overlapping. */
function LogoSlot({ src, alt }) {
  return (
    <div className="flex min-h-12 min-w-0 flex-1 basis-0 flex-col items-center justify-center overflow-hidden px-1 sm:px-1.5 md:px-2">
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-auto max-h-[2rem] w-full min-w-0 max-w-full object-contain object-center select-none sm:max-h-8 md:max-h-9"
      />
    </div>
  );
}

const LogoMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <h2 className="mb-10 text-center font-medium text-gray-500">
        Used by professionals to get job offers from
      </h2>

      <div className="flex w-[200%] min-w-0 shrink-0 animate-infinite-scroll">
        <div className="flex min-h-[3.25rem] min-w-0 w-1/2 shrink-0 items-center gap-x-5 px-2 sm:gap-x-6 sm:px-3 md:gap-x-8 md:px-4">
          {logos.map((logo) => (
            <LogoSlot key={`first-${logo.id}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
        <div
          className="flex min-h-[3.25rem] min-w-0 w-1/2 shrink-0 items-center gap-x-5 px-2 sm:gap-x-6 sm:px-3 md:gap-x-8 md:px-4"
          aria-hidden
        >
          {logos.map((logo) => (
            <LogoSlot key={`second-${logo.id}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
