import React from 'react';
import { classnames } from '@/helpers/utils';
import { Sizes } from '@/common/types';
import avatarStyles from './avatar.module.scss';
import AvatarSVG from './assets/user.svg';
import NextImage from 'next/image';

type AvatarProps = React.ComponentProps<typeof NextImage> & {
  bgColor?: string;
  size?: Sizes;
  iconComponent?: React.ReactNode;
};

const Avatar = React.forwardRef<HTMLElement, AvatarProps>(({
  crossOrigin, referrerPolicy, src, alt, bgColor = '#EE1A64', color = '#FFF', size = 'm', iconComponent, ...props
}, ref) => {

  let children = null;

  if (!!src) {
    children = (
      <NextImage
        src={src}
        alt={alt || ''}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        {...props}
      />
    );
  } else if (props.children !== undefined) {
    children = props.children;
  } else if (!!src && alt) {
    children = alt[0].toUpperCase();
  } else {
    children = <AvatarSVG stroke={color} />;
  }

  return (
    <div className={avatarStyles.avatarWrapper}>
      <figure
        ref={ref}
        className={classnames(
          avatarStyles.avatar,
          avatarStyles[`avatar-${size}`],
        )}
        style={{ backgroundColor: bgColor, color }}
      >
        {children}
      </figure>
      {iconComponent ? (
        <div
          className={classnames(
            avatarStyles.avatarIcon,
            avatarStyles[`avatarIcon-${size}`],
          )}
        >
          {iconComponent}
        </div>
      ) : null}
    </div>
  );
});
Avatar.displayName = 'Avatar';
export { Avatar };
