/* eslint-disable react/prop-types */
const Logo = ({ size }) => {
  return (
    <img
      src="https://www.metermarket.co.uk/assets/manufacturers/_manufacturerTile2x/logo_secure.png"
      alt="Secure Meter Logo"
      className={`h-${size} absolute `}
    />
  );
};

export default Logo;
