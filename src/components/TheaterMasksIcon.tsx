import { cn } from 'cn';

interface TheaterMasksIconProps {
  className?: string;
}

export function TheaterMasksIcon({
  className,
}: TheaterMasksIconProps) {
  return (
    <img
      src="/images/theater-masks-icon.png"
      alt=""
      className={cn('object-contain', className)}
    />
  );
}
