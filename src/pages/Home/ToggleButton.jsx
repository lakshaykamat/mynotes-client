import { Switch } from '@headlessui/react'

function ToggleButton({toggleButtonStatus,setToggleButtonStatus}) {
  return (
    <Switch
      checked={toggleButtonStatus}
      onChange={
        setToggleButtonStatus
      }
      className={`${
        toggleButtonStatus ? 'bg-slate-600' : 'bg-gray-400'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          toggleButtonStatus ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}
export default ToggleButton