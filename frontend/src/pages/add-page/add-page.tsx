import {FootballerForm} from '../../components/forms/footballer-form/footballer-form';

/**
 * Страница для добавления нового футболиста
 * @constructor
 */
export function AddPage() {
  return (
    <FootballerForm
      submitButtonText={'Добавить'}
      successMessage={'Информация добавлена'}/>
  );
}
