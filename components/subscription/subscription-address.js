import { AnimatePresence, motion } from 'framer-motion'
import { add, debounce, divide } from 'lodash'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { P } from '../common'
import SideBar from '../sidebar-right'
import SelectCard from '../select-card'

const userAddresses = [
  {
    id: 1,
    name: 'Gwarko 17, Satdobato, Lalitpur',
    street: '',
    district: 'Lalitpur',
    state: 'State Three',
    country: 'Nepal',
    default: false
  },
  {
    id: 2,
    name: 'Bagdol 19, Ekantakuna, Lalitpur',
    street: '',
    district: 'Lalitpur',
    state: 'State Three',
    country: 'Nepal',
    default: true
  }
]

const SelectAddress = forwardRef(({ onChangeValues }, ref) => {
  const intl = useIntl()
  const addressFormRef = useRef()
  const [displaySidebar, setDisplaySidebar] = useState(false)
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const watchAddress = watch('address')

  const validateFields = () => {
    const { address } = getValues()
    const error = false
    if (!address) {
      setFieldError('address', 'required', !error)
      error = true
    }
    return !error
  }

  const setFieldError = (fieldName, errorMsg, focus) => {
    setError(
      fieldName,
      { type: 'manual', message: errorMsg || 'required' },
      { shouldFocus: focus }
    )
  }

  const onClickNext = (onValidate) => {
    const validated = validateFields()
    if (validated) onValidate()
  }

  const onClickPrev = (cb) => {
    cb()
  }

  const onSubmit = () => {
    // NOTE: pass the values to parent onSubmit action
  }

  useImperativeHandle(ref, () => ({
    onClickNext,
    onClickPrev
  }))

  const onSelectAddress = (addressId) => {
    setValue('address', addressId)
  }

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  useEffect(() => {
    if (userAddresses.length && !watchAddress) {
      const defaultAddress =
        userAddresses.find((address) => address.default === true) || 1
      setValue('address', defaultAddress?.id || 1)
    }
  }, [userAddresses, watchAddress])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {userAddresses.map((address, idx) => (
          <SelectCard
            key={`location${idx}`}
            title={address.name}
            group={`location${idx}`}
            checked={address.id === watchAddress}
            onSelect={() => {
              onSelectAddress(address.id)
            }}
          />
        ))}
      </Form>
      <SelectCard
        title={'Add a location'}
        checked={true}
        onSelect={() => {
          addressFormRef.current?.toggleSidebar()
        }}
      />
      <SideBar ref={addressFormRef}>
        <div
          onClick={() => {
            addressFormRef.current?.toggleSidebar()
          }}
        >
          Click Here
        </div>
        <div>
          <P>Hello World</P>
        </div>
      </SideBar>
      {/* <AnimatePresence initial={false}>
        {displaySidebar && (
          <motion.div
            transition={{ duration: 0.8, delay: 0 }}
            animate={{ height: 200, opacity: 1, y: 0 }}
            initial={{ height: 0, opacity: 0, y: 10 }}
            exit={{ height: 0 }}
            style={{
              backgroundColor: 'grey',
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            <SideBar ref={addressFormRef}>
              <div
                onClick={() => {
                  displaySidebar(false)
                }}
              >
                Click Here
              </div>
              <div>
                <P>Hello World</P>
              </div>
            </SideBar>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  )
})

SelectAddress.displayName = 'SelectAddress'

export default SelectAddress
