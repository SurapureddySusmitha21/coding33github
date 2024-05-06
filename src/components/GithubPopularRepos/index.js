import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failer: 'FAILER',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    gitList: [],
    apiStatus: apiStatusConstants.initial,
    languageFiltersDataId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getListTheData()
  }

  getListTheData = async () => {
    const {languageFiltersDataId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${languageFiltersDataId}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        gitList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )
  renderRepositoriesListView = () => {
    const {gitList} = this.state
    return (
      <ul className="ul-second-container">
        {gitList.map(each => (
          <RepositoryItem key={each.id} repositoryItemList={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failer:
        return this.renderFailureView()
      default:
        return null
    }
  }

  getLanguageId = id =>
    this.setState({languageFiltersDataId: id}, this.getListTheData)

  render() {
    const {languageFiltersDataId} = this.state
    console.log(languageFiltersDataId)
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="ul-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              id={each.id}
              languages={each}
              getLanguageId={this.getLanguageId}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
