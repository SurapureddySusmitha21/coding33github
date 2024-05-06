// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languages, getLanguageId} = props
  const {language, id} = languages

  const getLanguageBtn = () => getLanguageId(id)

  return (
    <li className="list-item">
      <button className="btn" onClick={getLanguageBtn}>
        <p className="language-paragraph">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
