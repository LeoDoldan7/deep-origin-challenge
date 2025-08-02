import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Re-usable constraint class.
 * Gets the entire DTO instance through `args.object`.
 */
@ValidatorConstraint({
  name  : 'AtLeastOne',
  async : false,
})
export class AtLeastOneConstraint implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments): boolean {
    const [fields] = args.constraints as [string[]];
    const data = args.object as Record<string, unknown>;

    return fields.some((field) => data[field] !== undefined && data[field] !== null);
  }

  defaultMessage(args: ValidationArguments): string {
    const [fields] = args.constraints as [string[]];

    return `At least one of ${fields.join(', ')} must be provided`;
  }
}
/**
 * Class decorator — attach directly to the DTO.
 *
 * @example
 * ```ts
 * @AtLeastOne(['title','content'])
 * export class UpdateNoteDto { … }
 * ```
 */
export function AtLeastOne(
  fields: string[],
  options?: ValidationOptions
): ClassDecorator {
  return (target) => {
    registerDecorator({
      name         : 'AtLeastOne',
      target,                 // the DTO constructor
      propertyName : '___cls', // any dummy key; won’t be exposed because we override the error message
      constraints  : [fields],
      options,
      validator    : AtLeastOneConstraint,
    });
  };
}
