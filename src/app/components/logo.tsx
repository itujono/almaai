import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 100, height = 100 }: LogoProps) {
  return <Image src="/logo.svg" alt="Logo" width={width} height={height} />;
}
