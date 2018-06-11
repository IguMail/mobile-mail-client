import { observable } from 'mobx'

export default class SideMenu {

  @observable isOpen = false

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

}
