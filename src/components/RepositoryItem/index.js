// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemList} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} =
    repositoryItemList
  return (
    <li className="li_itemes">
      <div className="div-container">
        <img src={avatarUrl} alt={name} className="image-url" />
        <h1 className="name-heading">{name}</h1>
        <div className="first">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="imageFirst"
          />
          <p className="star-paragraph">{starsCount}</p>
        </div>
        <div className="second">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="imageFirst"
          />
          <p className="star-paragraph">{forksCount}</p>
        </div>
        <div className="third">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="imageFirst"
          />
          <p className="star-paragraph">{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
