import Image, { type ImageProps } from "next/image";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
  width?: number;
  height?: number;
}

export default function Logo({ width = 100, height = 100, priority = true, ...props }: LogoProps) {
  return <Image {...props} src="/logo.svg" alt="Logo" width={width} height={height} priority={priority} />;
}
