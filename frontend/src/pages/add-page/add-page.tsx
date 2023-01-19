import {FootballerForm} from '../../components/forms/footballer-form/footballer-form';

export function AddPage() {
  return (
    <FootballerForm
      submitButtonText={"Добавить"}
      successMessage={"Информация добавлена"}/>
  );
}
