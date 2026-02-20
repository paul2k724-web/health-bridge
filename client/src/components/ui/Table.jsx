import { forwardRef } from 'react'

const Table = forwardRef(({ children, className = '', ...props }, ref) => (
  <div className="overflow-x-auto rounded-lg border border-primary-100">
    <table
      ref={ref}
      className={`min-w-full divide-y divide-primary-100 ${className}`}
      {...props}
    >
      {children}
    </table>
  </div>
))

Table.displayName = 'Table'

const TableHead = ({ children, className = '', sticky = false }) => (
  <thead className={`bg-primary-50 ${sticky ? 'sticky top-0 z-10' : ''} ${className}`}>
    {children}
  </thead>
)

const TableBody = ({ children, className = '' }) => (
  <tbody className={`bg-white divide-y divide-primary-100 ${className}`}>
    {children}
  </tbody>
)

const TableRow = ({ children, className = '', onClick, hoverable = true }) => (
  <tr
    onClick={onClick}
    className={`
      ${hoverable ? 'hover:bg-primary-50 transition-colors duration-100' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </tr>
)

const TableHeader = ({ children, className = '', align = 'left' }) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <th
      className={`
        px-6 py-3.5
        text-xs font-semibold text-primary-600 uppercase tracking-wider
        ${alignStyles[align]}
        ${className}
      `}
    >
      {children}
    </th>
  )
}

const TableCell = ({ children, className = '', align = 'left' }) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <td
      className={`
        px-6 py-4
        text-sm text-primary-700
        ${alignStyles[align]}
        ${className}
      `}
    >
      {children}
    </td>
  )
}

const TableEmpty = ({ message = 'No data available', colSpan = 1 }) => (
  <tr>
    <td
      colSpan={colSpan}
      className="px-6 py-12 text-center text-primary-500"
    >
      {message}
    </td>
  </tr>
)

const TablePagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-primary-50 border-t border-primary-100">
      <p className="text-sm text-primary-600">
        Showing {startItem} to {endItem} of {totalItems} results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-primary-200
            hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-150"
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page
            if (totalPages <= 5) {
              page = i + 1
            } else if (currentPage <= 3) {
              page = i + 1
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i
            } else {
              page = currentPage - 2 + i
            }
            
            return (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`
                  w-8 h-8 text-sm font-medium rounded-md
                  transition-colors duration-150
                  ${currentPage === page
                    ? 'bg-primary-900 text-white'
                    : 'hover:bg-white border border-primary-200'
                  }
                `}
              >
                {page}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-primary-200
            hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-150"
        >
          Next
        </button>
      </div>
    </div>
  )
}

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Header = TableHeader
Table.Cell = TableCell
Table.Empty = TableEmpty
Table.Pagination = TablePagination

export default Table
