import { Navigate } from 'react-router-dom'
import useOrganizer from '../../hooks/useOrganizer'
import { STATUS_ROUTE } from '../../data/organizer'

export default function OrganizerGate() {
  const { status } = useOrganizer()
  return <Navigate to={STATUS_ROUTE[status] ?? STATUS_ROUTE.none} replace />
}