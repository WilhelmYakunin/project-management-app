import { useRef } from 'react';
import { ILazyTextInputProps } from './interfaces';

const LazyTextInput = (props: ILazyTextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      props.onInputCallBack(inputRef.current!.value);
    }
  }

  function onBlur() {
    props.onInputCallBack(inputRef.current!.value);
  }

  return (
    <input
      className={props.className ?? ''}
      type="text"
      placeholder={props.placeholder}
      defaultValue={props.defaultValue ?? ''}
      ref={inputRef}
      onBlur={onBlur}
      onKeyPress={onEnterPress}
    />
  );
};

export default LazyTextInput;
