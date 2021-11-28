import React, { PropsWithChildren, useRef, useEffect } from 'react';
import '../../styles/Components/radioDropdown.scss';
// A very generic dropdown menu with radio buttons
const DROPDOWN_ID = 'DropDownSortList';

const toggleDropdown = () => {
  const x = document.getElementById('dropdown-menu');
  if (x) {
    if (x.style.display === 'none') {
      x.style.display = 'block';
      x.style.position = 'absolute';
      x.style.inset = '0px 0px auto auto';
      x.style.margin = '0px';
      x.style.transform = 'translate(-0.25px,40px)';
    } else {
      x.style.display = 'none';
    }
  }
};

const Item = (props: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <li className="px-2 dropdown-item" onClick={props.onChange}>
    <div className="form-check form-check-inline w-100">
      <label className="form-check-label w-100" style={{ cursor: 'pointer' }}>
        <input
          className="form-check-input"
          type="radio"
          checked={props.checked}
          readOnly
        />
        {props.label}
      </label>
    </div>
  </li>
);
const ItemClear = (props: { onClick: () => void }) => (
  <li className="px-2 dropdown-item">
    <div className="form-check form-check-inline w-100 ">
      <a className="text-muted" onClick={props.onClick}>
        Clear
      </a>
    </div>
  </li>
);
const RadioDropDown = <T,>(
  props: PropsWithChildren<{
    options: Array<{ label: string; value: T }>;
    value?: T;
    onChange: (key: T | undefined) => void;
  }>,
) => {
  const currValue = props.value ? props.value : '';
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const element = dropdownRef.current as unknown as HTMLElement;
      if (element && !element.contains(event.target as Node)) {
        const x = document.getElementById('dropdown-menu');
        const btn = document.getElementById(DROPDOWN_ID);
        if (x && x.style.display !== 'none') {
          x.style.display = 'none';
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <span className="h-100 dropdown me-2 ms-2">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id={DROPDOWN_ID}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={toggleDropdown}
      >
        {props.children}
      </button>
      <ul
        id="dropdown-menu"
        className="dropdown-menu"
        aria-labelledby={DROPDOWN_ID}
        style={{ display: 'none' }}
        ref={dropdownRef}
      >
        {props.options.map((item) => (
          <Item
            key={item.label}
            label={item.label}
            checked={item.value === currValue}
            onChange={() => props.onChange(item.value)}
          />
        ))}
        <ItemClear onClick={() => props.onChange(undefined)} />
      </ul>
    </span>
  );
};
export default RadioDropDown;
