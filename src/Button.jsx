import "./Button.css"

export default function Button({ loading, fetchItems }) {
  return (
    <div id='btn-preloader-container'>
      {/* Button */}
      <button
        id="btn"
        onClick={fetchItems}
        autoFocus={true}
        disabled={loading.btnDisabled}
      >
        Fetch Data
      </button>
      {/* Preloader */}
      <div id={loading.preloader}></div>
    </div>
  )
}