type Props = {
    value: string;
    type?: "submit" | "button";
}

const Button = ({value, type}: Props) => {
  return (
    <button
    type={type ?? "button"}
    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none">
     {value}
    </button>
  )
}

export default Button