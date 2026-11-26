import { Field, SelectField } from '../common/FormField'
import { OptionCard } from './OptionCard'
import { ORGANIZER_CONFIG, ORG_TYPES, CITIES } from '../../data/organizer'

export function validateOrganization(d) {
  const x = {}
  if (!d.mode) x.mode = 'Please choose how you will organize events.'
  if (d.mode === 'organization') {
    if (d.orgName.trim().length < 2) x.orgName = 'Enter your organization’s name.'
    if (!d.orgType) x.orgType = 'Select the type of organization.'
    if (ORGANIZER_CONFIG.registrationNumberRequired && !d.regNumber.trim()) x.regNumber = 'Enter your business license number.'
    if (d.address.trim().length < 3) x.address = 'Enter your business address.'
  }
  if (d.mode && !d.city) x.city = 'Select your city.'
  return x
}

export function OrganizationStep({ data, set, errors }) {
  const org = data.mode === 'organization'
  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="mb-3 text-sm font-bold">How will you organize events?</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <OptionCard name="mode" value="individual" checked={data.mode === 'individual'} onChange={set('mode')} error={errors.mode}
            icon="user" title="Individual" text="I organize events independently." />
          <OptionCard name="mode" value="organization" checked={org} onChange={set('mode')} error={errors.mode}
            icon="building" title="Organization / Company" text="I represent a company, organization or group." />
        </div>
        {errors.mode && <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.mode}</p>}
      </fieldset>

      {data.mode && (
        <div key={data.mode} className="animate-up grid gap-5 border-t border-navy/10 pt-6 dark:border-white/10">
          {org && (<>
            <Field id="orgName" label="Organization name" icon="building" autoComplete="organization" placeholder="e.g. Addis Events PLC" value={data.orgName} onChange={set('orgName')} error={errors.orgName} />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField id="orgType" label="Organization type" options={ORG_TYPES} value={data.orgType} onChange={set('orgType')} error={errors.orgType} />
              <Field id="regNumber" label="Business license number" icon="file" optional={!ORGANIZER_CONFIG.registrationNumberRequired}
                hint="The number printed on your valid business license." value={data.regNumber} onChange={set('regNumber')} error={errors.regNumber} />
            </div>
            <Field id="address" label="Business address" icon="pin" autoComplete="street-address" placeholder="Street, sub-city, building" value={data.address} onChange={set('address')} error={errors.address} />
          </>)}
          <SelectField id="city" label={org ? 'City' : 'Which city are you based in?'} options={CITIES} value={data.city} onChange={set('city')} error={errors.city} />
        </div>
      )}
    </div>
  )
}