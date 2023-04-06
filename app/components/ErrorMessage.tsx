interface ErrorMessageProps {
  error: Error
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className='errorContainer'>
      <div className='errorBorderElements'>
        <h2 className='errorTitle'>Something went wrong</h2>
        <p>Error: {error.message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
