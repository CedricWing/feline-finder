import React from 'react';
import cn from 'classnames';
import { generatePages } from './helpers';
import '../../styles/Components/pagination.scss';

// Pagination to allow us to transverse cat breed list
export default function Pagination(props: {
  total: number;
  current: number;
  onClick: (page: number) => void;
}) {
  const { total, current, onClick } = props;
  const pageToDisplay = generatePages(total, current);
  return (
    <nav>
      <ul className="pagination justify-content-end">
        {pageToDisplay.map((page, index) => (
          <li
            key={`${page}${index}`}
            className={cn('page-item', {
              disabled: page == null,
              active: page === current,
            })}
          >
            <a
              href="#"
              className="page-link"
              onClick={page == null ? undefined : () => onClick(page)}
            >
              {page == null ? '...' : page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
