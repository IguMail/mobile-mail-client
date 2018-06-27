import { observable } from 'mobx'

export default class SideMenu {

  @observable isOpen = false
  @observable selected = null
  @observable error = null

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

}
