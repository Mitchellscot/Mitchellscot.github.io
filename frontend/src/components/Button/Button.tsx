import classNames from 'classnames';
import Link from 'next/link';
import {HTMLAttributeAnchorTarget} from 'react';
import {default as Variant} from '../../models/ButtonVariant';
import style from './Button.module.scss';

type ArrowOptions = 'none' | 'right' | 'left';

interface IButtonProps {
  arrowOptions?: ArrowOptions;
  arrowVariant?: Variant;
  disabled?: boolean;
  label: string;
  link?: string;
  target?: HTMLAttributeAnchorTarget;
  type?: 'submit' | 'button';
  variant?: Variant;
  onClick?: () => void;
}
export default function Button({
  arrowOptions = 'right',
  disabled = false,
  label,
  link,
  target,
  type = 'button',
  variant = 'orange',
  onClick,
}: IButtonProps) {
  const hasLink = link && link.length > 0;
  const buttonClasses = classNames(style.button, {
    [style.orangeButton]: variant === 'orange',
    [style.blueButton]: variant === 'blue',
    [style.whiteButton]: variant === 'white',
    [style.transparentButton]: variant === 'transparent',
  });
  const arrowClasses = classNames(style.arrow, {
    [style.lightOrangeArrow]: variant === 'orange',
    [style.orangeArrow]: variant === 'transparent' || variant === 'blue',
    [style.whiteArrow]: variant === 'white',
  });

  function handleOnClick() {
    onClick?.();
  }

  function renderArrow() {
    if (arrowOptions === 'none') {
      return null;
    }

    return (
      <span className={arrowClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            transform={
              arrowOptions === 'left' ? 'rotate(180 256 256)' : undefined
            }
            d="M502.8 279c2.5-3 4.8-6 6.3-9.7a37 37 0 0 0 2.2-11c.1-1.2.7-2.2.7-3.4v-.1a37.8 37.8 0 0 0-11.1-26.8L325.4 52.7a37.9 37.9 0 0 0-53.6 53.6l110.8 110.8H37.9a37.9 37.9 0 1 0 0 75.8h345.4l-111.7 113a37.9 37.9 0 1 0 53.9 53.2l175.3-177.4.1-.2c.9-.7 1.2-1.7 1.9-2.5z"
          />
        </svg>
      </span>
    );
  }

  if (hasLink) {
    return (
      <Link href={link!} legacyBehavior>
        <a className={buttonClasses} onClick={onClick} target={target}>
          {renderArrow()}
          {label}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={handleOnClick}
      type={type}
    >
      {renderArrow()}
      {label}
    </button>
  );
}
