
import "./CustomInput.css";

export const CustomInput = ({className, type, placeholder, name, value, onChangeFunction, onBlurFunction}) => {
    
    return (
        <input 
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}