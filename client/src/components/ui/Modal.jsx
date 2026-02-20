import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="min-h-screen px-4 flex items-center justify-center"
        onClick={closeOnOverlay ? onClose : undefined}
      >
        <div className="fixed inset-0 bg-primary-900/50 backdrop-blur-sm transition-opacity animate-fade-in" />
        
        <div
          className={`
            relative bg-white rounded-xl shadow-modal
            ${sizes[size]}
            w-full mx-auto
            animate-scale-in
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showClose) && (
            <div className="flex items-start justify-between p-6 border-b border-primary-100">
              <div>
                {title && (
                  <h2 className="text-xl font-semibold text-primary-900">{title}</h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-primary-500">{description}</p>
                )}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-2 -m-2 text-primary-400 hover:text-primary-600 rounded-lg
                    hover:bg-primary-50 transition-colors duration-150"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-end gap-3 mt-6 pt-6 border-t border-primary-100 ${className}`}>
    {children}
  </div>
)

Modal.Footer = ModalFooter

export default Modal
