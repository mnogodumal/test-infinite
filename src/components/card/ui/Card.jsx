import { useState } from "react"
import "./Card.css"

export function Card({ user, onSave }) {
  const [userInfo, setUserInfo] = useState({
    id: user.id,
    name: user.name,
    department: user.department,
    company: user.company,
    jobTitle: user.jobTitle
  })

  function handleSave() {
    onSave(userInfo)
  }

  return (
    <section className="Card">
      <div>
        <input className="Card-header" type="text" value={userInfo.name} onChange={(e) => setUserInfo((prevUserInfo) => ({ ...prevUserInfo, name: e.target.value }))} />
      </div>
      <div>
        <div className="Card-info">
          <span className="Card-info-title">Должность</span>
          <input className="Card-info-input" type="text" value={userInfo.jobTitle} onChange={(e) => setUserInfo((prevUserInfo) => ({ ...prevUserInfo, jobTitle: e.target.value }))} />
        </div>
        <div className="Card-info">
          <span className="Card-info-title">Отдел</span>
          <input className="Card-info-input" type="text" value={userInfo.department} onChange={(e) => setUserInfo((prevUserInfo) => ({ ...prevUserInfo, department: e.target.value }))} />
        </div>
        <div className="Card-info">
          <span className="Card-info-title">Компания</span>
          <input className="Card-info-input" type="text" value={userInfo.company} onChange={(e) => setUserInfo((prevUserInfo) => ({ ...prevUserInfo, company: e.target.value }))} />
        </div>
      </div>
      <div>
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </section>
  )
}
