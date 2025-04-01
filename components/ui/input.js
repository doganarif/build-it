import clsx from 'clsx';

export function Input({
  className,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  error,
  ...props
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        className={clsx(
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-gray-300 focus:ring-blue-600': !error,
            'border-red-500 focus:ring-red-600': error,
          },
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 