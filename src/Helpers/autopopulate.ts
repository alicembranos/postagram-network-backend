import { NextFunction } from 'express';

export default function autopopulate(field: string) {
  (next: NextFunction): void => {
    this.populate(field);
    next();
  };
}

// export default (field: string) =>
//   function (next: NextFunction) {
//     this.populate(field);
//     next();
//   };
