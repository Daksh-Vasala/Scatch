function Input({ type, placeholder, register, validator, name, errors }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validator)}
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />
      {errors?.[name] && (
        <p className="text-xs ml-2 text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}

export default Input;
