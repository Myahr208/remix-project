import EventEmitter from "events"
import { NightwatchBrowser } from "nightwatch"

class SelectFiles extends EventEmitter {
  command (this: NightwatchBrowser, selectedElements: any[]): NightwatchBrowser {
    const browser = this.api
    const self = this
    browser.perform(function () {
      const actions = this.actions({ async: true })
      actions.keyDown(this.Keys.SHIFT)
      for(let i = 0; i < selectedElements.length; i++) {
        actions.click(selectedElements[i].value)
      }
      self.emit('complete')
      return actions.contextClick(selectedElements[0].value)
    })    
    return this
  }
}


module.exports = SelectFiles
