import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/types'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'

interface ISocial {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }
  color: string
}

export const SocialConfigGlobal: ISocial[] = [
  { icon: FacebookIcon, color: '#1877F2' },
  { icon: YouTubeIcon, color: '#CD201F' }
]

export const SocialConfigDetail: ISocial[] = [
  { icon: FacebookIcon, color: '#1877F2' },
  { icon: YouTubeIcon, color: '#CD201F' }
]
