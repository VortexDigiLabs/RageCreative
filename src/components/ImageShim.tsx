import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  layout?: string;
  objectFit?: string;
  draggable?: boolean;
  [key: string]: any;
}

export default function Image({
  src,
  alt = '',
  fill,
  width,
  height,
  className = '',
  priority,
  quality,
  layout,
  objectFit,
  style,
  ...props
}: ImageProps) {
  const fillClasses = fill ? 'absolute inset-0 w-full h-full object-cover' : '';
  const combinedStyle = objectFit ? { objectFit: objectFit as any, ...style } : style;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={combinedStyle}
      className={`${fillClasses} ${className || ''}`.trim()}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}
