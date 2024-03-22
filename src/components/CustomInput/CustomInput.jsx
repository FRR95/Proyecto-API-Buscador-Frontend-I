
import "./CustomInput.css";

export const CustomInput = ({className, type, placeholder, name, value, onChangeFunction, onBlurFunction,disabled}) => {
    
    return (
        <input 
            className={className}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}