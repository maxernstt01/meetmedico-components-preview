import type { ComponentType } from 'react';
import * as Accordion from './AccordionPreview';
import * as Alert from './AlertPreview';
import * as AppFooter from './AppFooterPreview';
import * as AppHeader from './AppHeaderPreview';
import * as Avatar from './AvatarPreview';
import * as Badge from './BadgePreview';
import * as Breadcrumb from './BreadcrumbPreview';
import * as Button from './ButtonPreview';
import * as Card from './CardPreview';
import * as Carousel from './CarouselPreview';
import * as Checkbox from './CheckboxPreview';
import * as Chip from './ChipPreview';
import * as DatePicker from './DatePickerPreview';
import * as Descriptions from './DescriptionsPreview';
import * as Divider from './DividerPreview';
import * as Drawer from './DrawerPreview';
import * as Dropdown from './DropdownPreview';
import * as EmptyState from './EmptyStatePreview';
import * as Header from './HeaderPreview';
import * as Image from './ImagePreview';
import * as ImageUpload from './ImageUploadPreview';
import * as Input from './InputPreview';
import * as InputNumber from './InputNumberPreview';
import * as Label from './LabelPreview';
import * as Loader from './LoaderPreview';
import * as Logo from './LogoPreview';
import * as Menu from './MenuPreview';
import * as Modal from './ModalPreview';
import * as Navigation from './NavigationPreview';
import * as Notification from './NotificationPreview';
import * as OTPInput from './OTPInputPreview';
import * as Pagination from './PaginationPreview';
import * as PasswordInput from './PasswordInputPreview';
import * as PhoneNumberInput from './PhoneNumberInputPreview';
import * as Popover from './PopoverPreview';
import * as Progress from './ProgressPreview';
import * as Radio from './RadioPreview';
import * as Rate from './RatePreview';
import * as Search from './SearchPreview';
import * as Slider from './SliderPreview';
import * as Statistic from './StatisticPreview';
import * as Steps from './StepsPreview';
import * as Switch from './SwitchPreview';
import * as Table from './TablePreview';
import * as Tabs from './TabsPreview';
import * as TextArea from './TextAreaPreview';
import * as TimePicker from './TimePickerPreview';
import * as Timeline from './TimelinePreview';
import * as Tooltip from './TooltipPreview';
import * as Tour from './TourPreview';
import * as Typography from './TypographyPreview';

export interface PreviewModule {
  default: ComponentType;
  CODE: string;
}

// Every entry here is a statically-imported `<Name>Preview.tsx` module
// following the shared contract: default export is the preview component,
// `CODE` is the copy-pasteable usage snippet shown below it. One deep import
// per component, never through design-system's barrel (see
// BreadcrumbPreview.tsx's top comment for why).
export const PREVIEW_MODULES: Record<string, PreviewModule> = {
  accordion: Accordion,
  alert: Alert,
  appfooter: AppFooter,
  appheader: AppHeader,
  avatar: Avatar,
  badge: Badge,
  breadcrumb: Breadcrumb,
  button: Button,
  card: Card,
  carousel: Carousel,
  checkbox: Checkbox,
  chip: Chip,
  datepicker: DatePicker,
  descriptions: Descriptions,
  divider: Divider,
  drawer: Drawer,
  dropdown: Dropdown,
  emptystate: EmptyState,
  header: Header,
  image: Image,
  imageupload: ImageUpload,
  input: Input,
  inputnumber: InputNumber,
  label: Label,
  loader: Loader,
  logo: Logo,
  menu: Menu,
  modal: Modal,
  navigation: Navigation,
  notification: Notification,
  otpinput: OTPInput,
  pagination: Pagination,
  passwordinput: PasswordInput,
  phonenumberinput: PhoneNumberInput,
  popover: Popover,
  progress: Progress,
  radio: Radio,
  rate: Rate,
  search: Search,
  slider: Slider,
  statistic: Statistic,
  steps: Steps,
  switch: Switch,
  table: Table,
  tabs: Tabs,
  textarea: TextArea,
  timepicker: TimePicker,
  timeline: Timeline,
  tooltip: Tooltip,
  tour: Tour,
  typography: Typography,
};
