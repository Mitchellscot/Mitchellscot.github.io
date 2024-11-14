import classNames from 'classnames';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';
import { default as Variant } from '../../models/ButtonVariant';
import style from './Button.module.scss';

type ArrowOptions = 'none' | 'right' | 'left' | 'default';
type IconOptions = 'none' | 'run' | 'bike' | 'swim' | 'weights';

interface IButtonProps {
  arrowOptions?: ArrowOptions;
  iconOptions?: IconOptions;
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
  arrowOptions = 'default',
  iconOptions = 'none',
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
    [style.inactiveButton]: variant === 'inactive',
    [style.activeButton]: variant === 'active',
  });
  const iconClasses = classNames(style.icons, {
    [style.inactiveIcon]: variant == 'inactive',
    [style.activeIcon]: variant == 'active',
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
  function renderIcon() {
    if (arrowOptions !== 'none') {
      return null;
    }
    if (iconOptions == 'run') {
      return (
        <span className={iconClasses}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z" />
          </svg>
        </span>
      );
    } else if (iconOptions === 'bike') {
      return (
        <span className={iconClasses}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M400 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm27.2 64l-61.8-48.8c-17.3-13.6-41.7-13.8-59.1-.3l-83.1 64.2c-30.7 23.8-28.5 70.8 4.3 91.6L288 305.1V416c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-10.7-5.3-20.7-14.2-26.6L295 232.9l60.3-48.5L396 217c5.7 4.5 12.7 7 20 7h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H427.2zM56 384a72 72 0 1 1 144 0A72 72 0 1 1 56 384zm200 0A128 128 0 1 0 0 384a128 128 0 1 0 256 0zm184 0a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zm200 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
          </svg>
        </span>
      );
    } else if (iconOptions === 'swim') {
      return (
        <span className={iconClasses}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M309.5 178.4L447.9 297.1c-1.6 .9-3.2 2-4.8 3c-18 12.4-40.1 20.3-59.2 20.3c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-10.1 0-21.1-2.2-31.9-6.2C163.1 193.2 262.2 96 384 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-26.9 0-52.3 6.6-74.5 18.4zM160 160A64 64 0 1 1 32 160a64 64 0 1 1 128 0zM306.5 325.9C329 341.4 356.5 352 384 352c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 405.7 417 416 384 416c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 341.2 165.1 352 192 352c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
          </svg>
        </span>
      );
    } else if (iconOptions === 'weights') {
      return (
        <span className={iconClasses}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z" />
          </svg>
        </span>
      );
    } else {
      return null;
    }
  }
  const renderSpinner = () => (
    <svg width="24" height="24" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className={style.spinner} />
    </svg>
  );

  if (hasLink) {
    return (
      <Link href={link!} legacyBehavior>
        <a className={buttonClasses} onClick={onClick} target={target}>
          {arrowOptions === 'right' ? (
            <>
              {label} {renderArrow()}
            </>
          ) : (
            <>
              {renderArrow()} {label} {renderIcon()}
            </>
          )}
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
      {disabled ? (
        <>{label} {renderSpinner()}</>
      ) : arrowOptions === 'right' ? (
        <>
          {label}
          {renderArrow()}
        </>
      ) : (
        <>
          {renderArrow()}
          {label}
        </>
      )}
    </button>
  );
}
