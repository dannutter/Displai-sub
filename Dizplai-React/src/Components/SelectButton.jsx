import PropTypes from 'prop-types';

const SelectButton = ({ text, onClick, isSelected }) => {
    const buttonStyle = {
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {text}
        </button>
    );
};

SelectButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
};

export default SelectButton;
