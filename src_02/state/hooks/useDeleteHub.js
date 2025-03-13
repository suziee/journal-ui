import React from 'react';
import * as SUB from './subscriptionKeys';
import { useDeleteHub as id } from './hookNames';
import * as COMP from './componentNames';

export default function useDeleteHub(args) {
   const [locks, setLocks] = React.useState({
      [COMP.AREA_PAGE]: true,
      [COMP.CRAG_PAGE]: true,
      [COMP.JOURNAL_ENTRY_PAGE]: true,
      [COMP.ROUTE_PAGE]: true,
   });

   function toggle(name) {
      let newLocks = {
         ...locks,
         [name]: !locks[name]
      };

      setLocks(x => newLocks);
   }

   function reset(name) {
      let newLocks = {
         ...locks,
         [name]: true
      };

      setLocks(x => newLocks);
   }

   function isLocked(name) {
      return locks[name];
   }

   return {
      toggleLock: toggle,
      resetLock: reset,
      getLock: isLocked,
      locks: locks,
   }
}